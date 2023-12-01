interface SeperatorInterface {
  color: string;
  marginY: string;
  marginX: string;
}

function Seperator(props: SeperatorInterface) {
  return (
    <div
      className="border-t"
      style={{
        borderColor: props.color,
        marginTop: props.marginY,
        marginBottom: props.marginY,
        marginLeft: props.marginX,
        marginRight: props.marginX,
      }}
    />
  );
}

export default Seperator;
