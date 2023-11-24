
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
export default function ModalNotification({ notification, modal, toggle }) {
  // const [data, setData] = useState();
  // useEffect(() => {

  //   if (notificationId) fetchApiGetNotificationById(notificationId);
  // }, [notificationId]);

  // const fetchApiGetNotificationById = async (id) => {
  //   console.log(id)
  //   try {
  //     const res = await getNotificationById(id);
  //     setData(res?.data);
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{notification?.title}</ModalHeader>
      <ModalBody dangerouslySetInnerHTML={{__html: notification?.message}}></ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
