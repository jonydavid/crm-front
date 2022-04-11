import axios from "axios";
import { useEffect, useState } from "react";
import { TagPicker } from "rsuite";

const MultipleArray: any = ({endpoint, handleChange, keyFilter, value=[]}: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://localhost:5001/v1/api/${endpoint}`
        );

        var dataArray = res.data.map((item:any)=>{
            var items = {"label":item.value, "value":item.id};
           return items;

        });
        setData(dataArray);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <TagPicker data={data} onChange={(e)=>handleChange(e,keyFilter)} style={{ width: "100%" }} defaultValue={value} value={value} />
  );
};
export default MultipleArray;