import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import prettier from "prettier";

const root = process.cwd();
const input = path.join(root, "src/components/docs/component-demo.tsx");
const output = path.join(root, "src/lib/demo-code.generated.ts");
const text = await readFile(input, "utf8");
const source = ts.createSourceFile(input, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const component = source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === "ComponentDemo");
if (!component?.body) throw new Error("ComponentDemo was not found");

function identifiers(node) {
  const names = new Set();
  function visit(child) {
    if (ts.isIdentifier(child)) names.add(child.text);
    ts.forEachChild(child, visit);
  }
  visit(node);
  return names;
}
const intersects = (a, b) => [...a].some(name => b.has(name));
const topLevel = [];
for (const statement of source.statements) {
  if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      topLevel.push({ names: identifiers(declaration.name), node: declaration, code: `const ${declaration.getText(source)};` });
    }
  } else if (ts.isFunctionDeclaration(statement) && statement !== component) {
    topLevel.push({ names: new Set([statement.name.text]), node: statement, code: statement.getText(source).replace(/^export\s+/, "") });
  }
}
const states = component.body.statements.filter(ts.isVariableStatement).flatMap(statement =>
  [...statement.declarationList.declarations].filter(declaration => ts.isArrayBindingPattern(declaration.name)).map(declaration => ({ names: identifiers(declaration.name), node: declaration, code: `const ${declaration.getText(source)};` }))
);
const switchStatement = component.body.statements.find(ts.isSwitchStatement);
if (!switchStatement) throw new Error("Preview switch was not found");
const examples = {};
for (const clause of switchStatement.caseBlock.clauses) {
  if (!ts.isCaseClause(clause)) continue;
  const slug = clause.expression.text;
  const assignment = clause.statements.find(statement => ts.isExpressionStatement(statement) && ts.isBinaryExpression(statement.expression) && statement.expression.left.getText(source) === "demo");
  if (!assignment) throw new Error(`No preview expression for ${slug}`);
  const expression = assignment.expression.right;
  const needed = identifiers(expression);
  const helpers = new Set();
  let changed = true;
  while (changed) {
    changed = false;
    for (const helper of topLevel) {
      if (!helpers.has(helper) && intersects(helper.names, needed)) {
        helpers.add(helper);
        identifiers(helper.node).forEach(name => needed.add(name));
        changed = true;
      }
    }
  }
  const activeStates = states.filter(state => intersects(state.names, needed));
  for (const state of activeStates) identifiers(state.node).forEach(name => needed.add(name));
  const feedback = needed.has("setNotice") || needed.has("notice");
  if (feedback) { needed.add("notice"); needed.add("setNotice"); }
  const imports = [];
  for (const statement of source.statements.filter(ts.isImportDeclaration)) {
    const moduleName = statement.moduleSpecifier.text === "../../../packages/ui/src" ? "@ajsinnovations/ui" : statement.moduleSpecifier.text;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamespaceImport(bindings) && needed.has(bindings.name.text)) imports.push(`import * as ${bindings.name.text} from ${JSON.stringify(moduleName)};`);
    if (bindings && ts.isNamedImports(bindings)) {
      const used = bindings.elements.filter(element => needed.has(element.name.text));
      if (used.length) imports.push(`import { ${used.map(element => element.getText(source)).join(", ")} } from ${JSON.stringify(moduleName)};`);
    }
  }
  const code = `"use client";\n${imports.join("\n")}\n\n${[...helpers].map(helper => helper.code).join("\n\n")}\n\nexport default function Example() {\n${activeStates.map(state => state.code).join("\n")}\nconst demo = ${expression.getText(source)};\nreturn <UI.AjsProvider>{demo}${feedback ? '{notice && <div className="mt-5"><UI.Alert title={notice} variant="success" onDismiss={() => setNotice("")} /></div>}' : ""}</UI.AjsProvider>;\n}`;
  examples[slug] = await prettier.format(code, { parser: "typescript" });
}
const catalogText = await readFile(path.join(root, "src/lib/catalog.ts"), "utf8");
const slugs = [...catalogText.matchAll(/entry\("([^"]+)"/g)].map(match => match[1]);
for (const slug of slugs.filter(slug => !["installation", "tokens", "coverage"].includes(slug))) {
  if (!examples[slug]) throw new Error(`Missing preview code: ${slug}`);
}
const generated = `// Generated from component-demo.tsx. Run npm run docs:generate; do not edit.\nexport const demoCode: Record<string, string> = ${JSON.stringify(examples, null, 2)};\n`;
if (process.argv.includes("--check")) {
  if (await readFile(output, "utf8") !== generated) throw new Error("Preview code is stale. Run npm run docs:generate.");
  // Compile every displayed example as a standalone TSX module, with source exports.
  const directory = path.join(root, "node_modules/.cache/ajs-demo-code");
  await mkdir(directory, {recursive:true});
  const files = await Promise.all(Object.entries(examples).map(async ([slug, code]) => {
    const file = path.join(directory, `${slug}.tsx`);
    await writeFile(file, code);
    return file;
  }));
  const program = ts.createProgram(files, { noEmit:true, strict:true, skipLibCheck:true, target:ts.ScriptTarget.ES2020, jsx:ts.JsxEmit.ReactJSX, module:ts.ModuleKind.ESNext, moduleResolution:ts.ModuleResolutionKind.Bundler, esModuleInterop:true, paths:{"@ajsinnovations/ui":[path.join(root,"packages/ui/src/index.ts")]}});
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCurrentDirectory:()=>root,getCanonicalFileName:file=>file,getNewLine:()=>"\n"}));
  console.log(`Verified ${files.length} matching, independently typechecked preview examples.`);
} else {
  await writeFile(output, generated);
  console.log(`Generated ${Object.keys(examples).length} preview code examples.`);
}
