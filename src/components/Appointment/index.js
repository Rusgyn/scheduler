import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {/* {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => console.log("CONFIRM")}
          onEdit={() => console.log("EDIT")}
        />
        :
        <Empty onAdd={() => console.log("CREATE")} />} */}
        
      {mode === EMPTY && (
        <Empty onAdd={() => {
          transition(CREATE);
          console.log("Clicked onAdd")
          }} />
        )
      }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        )
      }
      {mode === CREATE && (
        <Form 
          interviewers = {props.interviews}
        />
      )}
    </article>
  );
}
