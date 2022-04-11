import { FormControl } from "react-bootstrap";

const Textfield: any = ({onChange, keyFilter, value}:any) => {
  return <FormControl className="mt-1" size="sm" onChange={onChange} id={keyFilter} value={value}/>;
};

export default Textfield;
