import { getSendNotificationByUserId } from "api/notification";
import React, { useEffect, useState } from "react";
import { DropdownItem, DropdownMenu } from "reactstrap";
import ModalNotification from "./ModalNotification";
import { updateNotificationReaded } from "api/notification";
import useAuthContext from "utils/useAuthContext";

export default function NotificationUI({data, fetchApiGetNotificationByUserId}) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const toggle = async (item) => {
    setModal(!modal);
    setSelectedItem(item);
    if(item.users?.find(i => i.id == user.id && i.readed == false)){
      const res = await updateNotificationReaded(item._id);
      if(res.success) {
        fetchApiGetNotificationByUserId()
      }
    }

  };
  
  return (
    <>
      {data?.length > 0 && (
        <DropdownMenu right>
          {data?.map((item, k) => {
            const readed = item.users.find(i => i.id == user.id && i.readed == false)
            return (
              <>
              {k !== 0 && <DropdownItem divider />}
                <DropdownItem key={k} style={{width: 400, whiteSpace: "unset", display: "flex", background: readed?"transparent": "#dddddd40"}} onClick={() => toggle(item)}>
                  <div  style={{flex:1}}>
                    <p
                      className="m-0 font-weight-700 text-xs"
  
                      style={{ cursor: "pointer", color: "black", width: "100%"}}
                    >
                      {item?.title}
                    </p>
                    <span 
                      style={{width: "100%"}} 
                      className="text-hidden-2" 
                      dangerouslySetInnerHTML={{__html: item.message}}>
                    </span>
                  </div>
                  {readed && <div style={{width: 16, height: 16, borderRadius: "100%", background: "blue"}}></div>}
                  
                </DropdownItem>
              </>
            )
          }
          )}
        </DropdownMenu>
      )}
      {selectedItem && (
        <ModalNotification
          notification={selectedItem}
          modal={modal}
          toggle={toggle}
        />
      )}
    </>
  );
}
