import { getNotificationById } from "api/notification";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
export default function ModalNotification({ notificationId, modal, toggle }) {
  const [data, setData] = useState();
  useEffect(() => {
    if (notificationId) fetchApiGetNotificationById(notificationId);
  }, [notificationId]);

  const fetchApiGetNotificationById = async (id) => {
    try {
      const res = await getNotificationById(id);
      setData(res?.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{data?.title}</ModalHeader>
      <ModalBody>{data?.message}</ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
