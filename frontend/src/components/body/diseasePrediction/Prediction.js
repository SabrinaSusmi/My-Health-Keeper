import React from "react";
import Table from "react-bootstrap/Table";
import { InputLabel } from "@material-ui/core";
export default function Prediction(props) {
  const aa = props.getPrediction[0];
  return (
    <div>
      <InputLabel className="prediction_label">
        <div className="prediction_div">
          {" "}
          <Table hover size="md">
            <tr>
              <th>#</th> &emsp;
              <th>Probable Disease</th>
              &emsp; &emsp; &emsp; &emsp; &emsp;
              <th>Suggested Specialist</th>
            </tr>
            <br />
            <br />
            <tr>
              {" "}
              <td>1</td> &emsp;
              <td>
                {aa} &emsp; &emsp; &emsp; {props.percent}{" "}
              </td>
              &emsp; &emsp; &emsp; &emsp; &emsp;
              <td>&emsp;{props.specialist}</td>
            </tr>
            <br /> <br />{" "}
            <tr>
              <td>2</td> &emsp;
              {/*   <td>Rice</td>
                <td>2 cups</td>
                 */}
            </tr>
            <br /> <br />{" "}
            <tr>
              <td>3</td> &emsp;
              {/*   <td>Rice</td>
                <td>2 cups</td>
                 */}
            </tr>
          </Table>
        </div>
      </InputLabel>

      <div className="footer">
        Our website does not provide medical advice. It is not a substitute for
        professional medical advice,diagnosis or treatment
      </div>
    </div>
  );
}
