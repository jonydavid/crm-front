import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { multiSelectOption } from "services/filterService";

interface toolFunction {
  endpoint: string;
  onChange: (event?: any) => void;
  keyFilter: string;
  value?: any;
  disabled?: boolean;
}

const MultipleSelect = ({
  endpoint,
  onChange,
  keyFilter,
  value=null,
  disabled = false,
}: toolFunction) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await multiSelectOption(endpoint);
        setData(result);
      } catch (err) {
        console.log(err);
      }
    }
   fetchData()
  }, []);

  return (
    <Form.Select
      onChange={onChange}
      id={keyFilter}
      name={keyFilter}
      value={value}
      defaultValue={value}
      disabled={disabled}
    >

      <option value={null}>Seleccione ...</option>
      {data.map((res: any) => (
        <option key={res.id} value={res.id}>
          {res.value}
        </option>
      ))}
    </Form.Select>
  );
};
export default MultipleSelect;
