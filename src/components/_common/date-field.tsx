import { FormControl } from "react-bootstrap";
import DateRangePicker from 'rsuite/DateRangePicker';
import "rsuite/dist/rsuite.min.css";

const Datefield: any = ({keyFilter,onChange,value}:any) => {
  
  const handleChange = (e: any) =>{
    if(!e) {
      const result = {
        target :   {
          id: keyFilter, 
          value: {
          from: dateFormat(new Date()),
          to: dateFormat(new Date())
        }}
      }
      
      onChange(result)
      return;
    }
    if(Object.keys(e).length === 0) return;
    const result = {
      target :   {
        id: keyFilter, 
        value: {
        from: dateFormat(e[0]),
        to: dateFormat(e[1])
      }}
    }
    
    onChange(result)
  }

  const dateFormat = (date:any)=>{
    var day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
    var month = `0${date.getMonth() + 1}`.slice(-2);
    var year = date.getFullYear();
    
    return `${year}-${month}-${day}`
  }

  return <DateRangePicker onChange={handleChange} value={value.valueData?[new Date(value.valueData.from),new Date(value.valueData.to)]:[new Date(), new Date()]}  />;
};

export default Datefield;