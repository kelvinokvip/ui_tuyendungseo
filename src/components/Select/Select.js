import Select2 from "react-select2-wrapper";
import { Form } from "reactstrap";

const { Row, Input } = require("reactstrap");

const CustomSelect = ({
  type,
  options,
  className,
  styles,
  onChange,
  value,
}) => {
  return (
    <Row className="mb-5 filter">
      <div className="col-sm-3">
        {/* <label htmlFor="categoryFilter">Chuyên mục</label>
        <Input id="categoryFilter" type="select">
          <option>Xổ số</option>
          <option>Thể thao</option>
        </Input> */}
        <Form>
          <Select2
            className="form-control"
            //   data-minimum-results-for-search="Infinity"
            defaultValue="1"
            multiple
            data={[
              { id: "1", text: "Alerts" },
              { id: "2", text: "Badges" },
              { id: "3", text: "Buttons" },
              { id: "4", text: "Cards" },
              { id: "5", text: "Forms" },
              { id: "6", text: "Modals" },
            ]}
          />
        </Form>
      </div>
    </Row>
  );
};

export default CustomSelect;
