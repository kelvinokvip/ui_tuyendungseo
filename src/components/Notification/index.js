import { getSendNotificationByUserId } from "api/notification";
import React, { useEffect, useState } from "react";
import { DropdownItem, DropdownMenu } from "reactstrap";

export default function NotificationUI() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchApiGetNotificationByUserId(userId);
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
        <DropdownMenu>
          {data?.map((item, k) => (
            <DropdownItem key={k} header>
              {item?.title}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </>
  );
}
