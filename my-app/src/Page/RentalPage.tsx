import styles from "../css/RentalPage.module.css";
import { useNavigate } from "react-router-dom";
import { useRentalPage_3 } from "../hook/RentalPageAPI";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import CardMedia from "@mui/material/CardMedia";
import { MDBBtn } from "mdb-react-ui-kit";
import { useAppDispatch } from "../hook/hooks";
import { updateRentalList } from "../slice/checkOutSlice"
// --------------------------------------------------------------------------------

export function RentalPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const RentListData = useRentalPage_3();
  const [donateItemIds, setDonateItemIds] = useState<Set<number>>(new Set());
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  // ------------------

  const submit = () => {
    dispatch(updateRentalList(Array.from(donateItemIds)));
    console.log("submit");
    console.log({ donateItemIds });
    navigate("/CheckoutTransaction");
  };

  // ------------------

  const updateDonateItem = (id: number) => {
    const updatedItemIds = new Set(donateItemIds);
    if (updatedItemIds.has(id)) {
      updatedItemIds.delete(id);
    } else {
      updatedItemIds.add(id);
    }
    setDonateItemIds(updatedItemIds); //
  };
  // ------------------

  return (
    <>
      <div className="rentalPageControl">
        <div className={styles.title}>
          <span className={styles.header}>以下物品可供租借</span>
          <div className="rentalPageContainer">
            {RentListData &&
              Array.isArray(RentListData) &&
              RentListData.map(
                (
                  entry: {
                    donate_item_id: number;
                    item_name: string;
                    deposit_charge: number;
                    rent_charge: number;
                    image: string;
                  },
                  index
                ) => (
                  <Row className="rentalPageCardControl" key={index}>
                    <Col className="rentalPageCard">
                      <CardMedia
                        className="rentalPageCardImg"
                        component="img"
                        alt="green iguana"
                        height="200"
                        image={entry.image}
                        style={{ objectFit: "contain" }}
                      />
                      <Toast>
                        <Toast.Header closeButton={false}>
                          <strong className="me-auto">物資</strong>
                          <small>{entry.item_name}</small>
                        </Toast.Header>
                        <Toast.Header closeButton={false}>
                          <strong className="me-auto">按金:</strong>
                          <small>$ {entry.deposit_charge}</small>
                        </Toast.Header>
                        <Toast.Header closeButton={false}>
                          <strong className="me-auto">租金:</strong>
                          <small>$ {entry.rent_charge}/月</small>
                        </Toast.Header>
                        <Toast.Body className={styles.toast_body} >
                          <div className="mb-3">
                            <Form.Check
                              onChange={() =>
                                updateDonateItem(entry.donate_item_id)
                              }
                              checked={donateItemIds.has(entry.donate_item_id)}
                            />
                          </div>
                        </Toast.Body>
                      </Toast>
                    </Col>
                    {/* <-----------------------------------------------------> */}
                  </Row>
                )
              )}
          </div>
          <div className="rentalPageBtnControl">
            <MDBBtn className="rentalPageBtn" onClick={submit}>
              下一頁
            </MDBBtn>
          </div>
        </div>
      </div>
    </>
  );
}


