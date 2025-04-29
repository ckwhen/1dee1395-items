type Props = {
  isEnabled: boolean;
  text: React.ReactNode;
}

function SwitchText({ isEnabled, text }: Props) {
  return (
    <span className={isEnabled ? 'text-green-800' : 'text-red-700'}>
      {text}
    </span>
  );
}

export default SwitchText;
