import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssociatedPollsAction } from "../redux/actions/vote.actions";
import Loader from "./Loader";
import Message from "./Message";

const AssociatedPolls = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.loginUser);

  const {
    loading: loadingAssociatedPoll,
    success: successAssociatedPoll,
    pollInfo: voteInfoAssociatedPoll,
    error: errorAssociatedPoll,
  } = useSelector((store) => store.pollsGetAllAssociated);

  useEffect(() => {
    if (userInfo) {
      dispatch(getAllAssociatedPollsAction(userInfo?.username));
    }
  }, [userInfo]);

  return (
    <section>
      <h2>Your Polls</h2>
      {loadingAssociatedPoll && <Loader color="black" />}
      {voteInfoAssociatedPoll?.data.length > 0 ? (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {voteInfoAssociatedPoll?.data.map((poll) => {
              return (
                <tr key={poll?._id}>
                  <td>{poll?.title}</td>
                  <td>
                    <Link href={`/polls/${poll?.slug}`} passHref>
                      <a className="btn btn-secondary">Edit to publish</a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <>
          {errorAssociatedPoll && (
            <Message variant="danger">{errorAssociatedPoll}</Message>
          )}
        </>
      )}
    </section>
  );
};

export default AssociatedPolls;
