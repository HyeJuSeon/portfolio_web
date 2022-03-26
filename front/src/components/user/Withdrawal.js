import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import { Container, Col, Row, Form, Button } from "react-bootstrap";
=======
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
>>>>>>> Stashed changes

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import { UserStateContext } from "../../App";
import confirmModal from "./ConfirmWithdrawal";

function Withdrawal() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const userState = useContext(UserStateContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< Updated upstream
=======
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            // await Api.post(`withdrawal/${userState.user.id}`, {
            //   email,
            //   password,
            // });
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );

            dispatch({ type: "LOGOUT" });
            navigate("/login");
            sessionStorage.removeItem("userToken");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    /*
    try {
>>>>>>> Stashed changes
      const check = confirmModal();
      // "user/register" 엔드포인트로 post요청함.//////////////////////////////////
      if (check === 1) {
        await Api.post(`withdrawal/${userState.user.id}`, {
          email,
          password,
        });
        window.alert("그동안 Dfolio를 이용해 주셔서 감사합니다.");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        sessionStorage.removeItem("userToken");
      } else if (check === 0) {
        window.alert("회원탈퇴를 취소하셨습니다.");
        navigate("/");
      }
    } catch (err) {
      window.alert("회원탈퇴에 실패했습니다! 이메일 또는 아이디를 확인하세요.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="deleteEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="deletePassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
<<<<<<< Updated upstream
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" onClick={() => navigate("/")}>
                  뒤로가기
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" type="submit">
                  탈퇴하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
=======
            </div>
          </div>
          <form className="withdrawal-btn-wrap">
            <button
              className="withdrawal-btn-back"
              type="submit"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button
              className="withdrawal-btn-delete"
              type="submit"
              disabled={!isFormValid}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
>>>>>>> Stashed changes
  );
}

export default Withdrawal;
