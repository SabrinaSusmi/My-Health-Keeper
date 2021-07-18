import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


const BpModal = ({showBpModal, setShowBpModal}) => {

    
    const closeBpModal = () => {
        setShowBpModal(false);
      };
    
        return (
            <>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showBpModal}
                onHide={closeBpModal}
               
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Blood Pressure</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => {closeBpModal()}}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
              
            </>
      )

}

export default BpModal;