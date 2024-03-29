function CsvFileUpload() {
  return (
    <form>
      <label htmlFor="csvFile">Choose CSV file</label>
      <input type="file" name="csvFile" />
      <input type="submit" value="Upload" />
    </form>
  );
}

export default CsvFileUpload;
