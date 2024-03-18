interface TextComponentProps {
  title: string;
  content: string;
}

function TextComponent({ title, content }: TextComponentProps) {
  return (
    <>
      <h6 className="font-semibold">{title}</h6>
      <p className="text-sm">{content}</p>
    </>
  );
}

export default TextComponent;
