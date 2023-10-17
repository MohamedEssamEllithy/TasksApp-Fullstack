import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.css";

function StaticExample(props) {
  let { setShowModal, deleteAcc, isLoading, error, success } = props;
  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "absolute",
        top: "5rem",
        height: "40vh",
        zIndex: "3",
      }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Delete your Account</Modal.Title>
          <button
            className={`${styles.meBtn}`}
            onClick={() => {
              setShowModal(false);
            }}
          >
            <i className="fa-solid fa-x" style={{ color: " #000" }}></i>
          </button>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete your account</p>
          <div className="text-danger">
            {error ? error : success ? success : ""}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              deleteAcc();
            }}
          >
            {isLoading ? (
              <i className="fa fa-spin fa-spinner"></i>
            ) : (
              "Delete Account"
            )}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default StaticExample;
