import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  const [sortBy, setSortBy] = useState('updateAt');
	const sort = [
    { name: 'Recently', value: 'updateAt' },
    { name: 'Like', value: 'likeCount' },
    { name: 'View', value: 'viweCount' },
  ];

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get('userlist', sortBy).then(res => setUsers(res.data));
  }, [userState]);

  const handelClickSortBtn = () => {
		Api.get("userlist", sortBy).then(res => setUsers(res.data));
	}

  return (
    <Container fluid>
      <ButtonGroup style={{ marginBottom:"20px"}}>
        {sort.map((radio, idx) => (
          <ToggleButton
            key={idx}
              id={`radio-${idx}`}
            type="radio"
            variant="outline-secondary"
            name="radio"
            value={radio.value}
            checked={sortBy === radio.value}
            onChange={(e) => setSortBy(e.currentTarget.value)}
            onClick={handelClickSortBtn}
            >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Row xs="auto" className="jusify-content-center">
        {users.map(user => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
