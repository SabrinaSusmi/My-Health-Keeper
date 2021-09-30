import React from "react";
import Table from "react-bootstrap/Table";
import { InputLabel } from "@material-ui/core";
export default function Prediction(props) {
  const diseaseName = props.getPrediction;
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
                {diseaseName[0]} &emsp; &emsp; &emsp; {props.percent[0]}%{" "}
              </td>
              &emsp; &emsp; &emsp; &emsp; &emsp;
              <td>&emsp;{props.specialist[0]}</td>
            </tr>
            <br /> <br />{" "}
            <tr>
              <td>2</td> &emsp;
                <td>  {diseaseName[1]} &emsp; &emsp; &emsp; {props.percent[1]}%{" "}</td>
                &emsp; &emsp; &emsp; &emsp; &emsp;   <td>&emsp;{props.specialist[1]}</td>
                
            </tr>
            <br /> <br />{" "}
            <tr>
              <td>3</td> &emsp;
              <td>  {diseaseName[2]} &emsp; &emsp; &emsp; {props.percent[2]}%{" "}</td>
                &emsp; &emsp; &emsp; &emsp; &emsp;   <td>&emsp;{props.specialist[2]}</td>
               
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
