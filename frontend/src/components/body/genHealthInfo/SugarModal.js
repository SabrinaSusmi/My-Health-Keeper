import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


const SugarModal = ({showSugarModal,setShowSugarModal}) => {
  
    
    const closeSugarModal = () => {
         setShowSugarModal(false);
        
      };
    
        return (
            <>
              {showSugarModal ? (

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                showSugarModal={showSugarModal}
                onHide={closeSugarModal}
               
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Sugar Level</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => {closeSugarModal()}}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
               ) : null}
            </>
      )

}

export default SugarModal;