import './checkboxStar.css';

interface IProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxStar:React.FC<IProps> = ({ checked, onChange }) => {
  return (
    <label className="checkbox-star">
      <input
        className="inpet-checkbox"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox-icon"></span>
    </label>
  );
};

export default CheckboxStar;