import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editLogisticColumn, useGetLogisticInfo } from "../hook/logisticAPI";
import loadingGif from "../image/loading.gif";
// -----------------------------------------------------

import { Form, Col, Row } from "react-bootstrap";
import { useState } from "react";

import { queryClient } from "..";



export default function FinalConfirmPage() {
  // const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState([]);

  const [buildingInput, setBuildingInput] = useState("");


  const OnEditItem = useMutation({
    mutationFn: async (data: {
      id:number,
      building:string
    }) => editLogisticColumn(data.id,data.building),
    onSuccess: ()=>
      queryClient.invalidateQueries({
        queryKey:["logistic"],
        exact:true,
      }),
  })

  const [region, setRegion] = useState("");
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);

    switch (selectedRegion) {
      case "香港島":
        setDistrictOptions(["中西區", "灣仔區", "東區", "南區", "其他"]);
        break;
      case "九龍區":
        setDistrictOptions([
          "九龍城區",
          "觀塘區",
          "深水埗區",
          "黃大仙區",
          "油尖旺區",
          "其他",
        ]);
        break;
      case "新界區":
        setDistrictOptions([
          "葵青區",
          "荃灣區",
          "離島區",
          "北區",
          "西貢區",
          "沙田區",
          "大埔區",
          "屯門區",
          "元朗區",
          "其他",
        ]);
        break;
      default:
        setDistrictOptions([]);
    }
  };
  const [districtOptions, setDistrictOptions] = useState<string[]>([]);
    const [districtInput, setDistrictInput] = useState("");


  const getLogisticList:
    | string
    | Array<{
        id: number;
        uuid?: number;
        purpose?: string;
        room: string;
        building: string;
        street: string;
        district: string;
        contact_number: number | null;
        contact_name: string;
        confirmed_date: string;
        confirmed_session: string;
        user_id?: number;
        item_name?:string;
        logistic_id?:number;
        donate_item_id?:number;
        qty:number;
      }> = useGetLogisticInfo();
  console.log("getall", getLogisticList);

  return (
    <div>
      <h1>getLogisticList</h1>
      {/* {
            Array.isArray(getLogisticList)?
            (getLogisticList.length > 0 ? 
            (getLogisticList.map((entry)=>(entry.id)))
            :<h3>bye</h3>):<h1>no data</h1>
            } */}

{/* {Array.isArray(getLogisticList) && getLogisticList.length > 0 ? (
  <Form>
    <Row>
      <Col>
        <Form.Group>
          <Form.Label>Purpose</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].purpose} />
          <Form.Label>Donate Item</Form.Label> 
          <Form.Control value={getLogisticList[getLogisticList.length - 1].item_name} />
          <Form.Label>Quantity</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].qty} />
          <Form.Label>Room</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].room} />
          <Form.Label>Building</Form.Label> 
          <Form.Control value={getLogisticList[getLogisticList.length - 1].building} />
          <Form.Label>street</Form.Label> <button onClick={()=>{OnEditItem.mutate({id:2, building:buildingInput})}}>edit</button>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].street} />
          <Form.Label>區域</Form.Label>
          <Form.Select onChange={handleRegionChange} value={region}>
            <option></option>
            <option>香港島</option>
            <option>九龍區</option>
            <option>新界區</option>
          </Form.Select>
          <Form.Label>district</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].district} />
          <Form.Label>contact_number</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].contact_number} />
          <Form.Label>contact_name</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].contact_name} />
          <Form.Label>confirmed_date</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].confirmed_date} />
          <Form.Label>confirmed_session</Form.Label>
          <Form.Control value={getLogisticList[getLogisticList.length - 1].confirmed_session} />
        </Form.Group>

      </Col>
    </Row>
  </Form> */}
{/* // 2nd method //  */}

{Array.isArray(getLogisticList) && getLogisticList.length > 0 ? (
  <Form>
    <Row>
      {getLogisticList.map((entry) => (
        <Col key={entry.id}>
          <Form.Group>
           
            <Form.Label>Purpose</Form.Label>
            <Form.Control value={entry.purpose} />
            <Form.Label>Donate Item</Form.Label>
            <Form.Control value={entry.item_name} />
            <Form.Label>Quantity</Form.Label>
            <Form.Control value={entry.qty} />
            <Form.Label>Room</Form.Label>
            <Form.Control value={entry.room} />
            <Form.Label>Building</Form.Label>
            <Form.Control value={entry.building} />
            <Form.Label>street</Form.Label>
            <Form.Control value={entry.street} />
            <Form.Label>區域</Form.Label>
            <Form.Select onChange={handleRegionChange} value={region}>
              <option></option>
              <option>香港島</option>
              <option>九龍區</option>
              <option>新界區</option>
            </Form.Select>
            <Form.Label>district</Form.Label>
            <Form.Control value={entry.district} />
            <Form.Label>contact_number</Form.Label>
            {/* <Form.Control value={entry.contact_number} />
            <Form.Label>contact_name</Form.Label> */}
            <Form.Control value={entry.contact_name} />
            <Form.Label>confirmed_date</Form.Label>
            <Form.Control value={entry.confirmed_date} />
            <Form.Label>confirmed_session</Form.Label>
            <Form.Control value={entry.confirmed_session} />
          </Form.Group>
          {/* Other fields as needed, using Form.Group, Form.Label, Form.Control, etc. */}
        </Col>
      ))}
    </Row>
  </Form>
      ) : (
        <h3>No data available</h3>
      )}
    </div>
  );
}