import { getSendNotificationByUserId } from "api/notification";
import React, { useEffect, useState } from "react";
import { DropdownItem, DropdownMenu } from "reactstrap";
import ModalNotification from "./ModalNotification";

export default function NotificationUI() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const toggle = (itemId) => {
    setModal(!modal);
    setSelectedItemId(itemId);
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    // if (userId) {
    fetchApiGetNotificationByUserId(userId);
    // }
  }, []);

  const fetchApiGetNotificationByUserId = async (userId) => {
    try {
      setLoading(true);
      const res = await getSendNotificationByUserId(userId);
      setData(res);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {data?.length > 0 && (
        <DropdownMenu right>
          {data?.map((item, k) => (
            <DropdownItem key={k} header>
              <p
                className="text-overflow m-0 font-weight-700 text-blue text-xs "
                onClick={() => toggle(item?._id)}
                style={{ cursor: "pointer" }}
              >
                {item?.title}
              </p>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
      {selectedItemId && (
        <ModalNotification
          notificationId={selectedItemId}
          modal={modal}
          toggle={toggle}
        />
      )}
    </>
  );
}
