import UnorderedList from './UnorderedList';

type CheckboxOption = {
  id: string;
  label: string;
  value: string;
  [key: string]: unknown;
};

type Props<T extends CheckboxOption> = {
  options: T[];
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
};

function CheckboxGroup<T extends CheckboxOption>({
  options,
  values,
  onChange,
  className
}: Props<T>) {
  const handleChange = (optionValue: string, checked: boolean) => {
    const newValues = checked
      ? [...values, optionValue]
      : values.filter(value => value !== optionValue);
    onChange(newValues);
  };

  return (
    <UnorderedList<CheckboxOption>
      className={className}
      items={options}
      renderItem={({ id, label, value }) => (
        <label key={id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.includes(value)}
            onChange={event => handleChange(value, event.target.checked)}
          />
          {label}
        </label>
      )}
    />
  );
}

export default CheckboxGroup;
