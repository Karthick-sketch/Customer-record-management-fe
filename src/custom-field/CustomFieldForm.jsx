function CustomFieldForm() {
  return (
    <div>
      <p>Custom field name</p>
      <input type="text" />
      <p>Field type</p>
      <select id="field-type-dropdown">
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
      </select>
      <p>
        <input type="checkbox" />
        Mandatory field
      </p>
      <input type="submit" value="Create" />
    </div>
  );
}

export default CustomFieldForm;
