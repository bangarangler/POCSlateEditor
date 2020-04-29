// Import React dependencies.
import React, { useEffect, useMemo, useState, useCallback } from "react";
// // Import the Slate editor factory.
import { createEditor, Editor, Transforms } from "slate";

// // Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const makeAnd = (e) => {
    if (e.key === "&") {
      e.preventDefault();
      editor.insertText("and");
    }
  };

  const stuff = (e) => {
    if (e.key === "`" && e.ctrlKey) {
      e.preventDefault();
      Transforms.setNodes(
        editor,
        { type: "code" },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      {/* <Editable renderElement={renderElement} onKeyUp={(e) => makeAnd(e)} /> */}
      <Editable renderElement={renderElement} onKeyUp={(e) => stuff(e)} />
    </Slate>
  );
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default SlateEditor;
