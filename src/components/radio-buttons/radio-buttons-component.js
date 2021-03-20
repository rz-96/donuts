function RadioButtons({ value, options, onChange }) {
  return (
    <div className="block">
      <div>
        {options.map((e, i) => (
          <div key={i}>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="radio"
                value={e.value}
                checked={value === e.value}
                onClick={() => onChange(e.value)}
              />
              <span className="ml-2">{e.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export { RadioButtons };
