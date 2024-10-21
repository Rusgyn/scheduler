import React, { useEffect, useRef } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Using useRef to track if component is mounted
  const isMounted = useRef(true);

  // Cleanup function in useEffect
  useEffect(() => {
    return () => {
      isMounted.current = false; // Cleanup to prevent state updates on unmounted component
    };
  }, []);

  function save(name, interviewer) {
    const interviewData = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interviewData)
      .then(() => {
        if (isMounted.current) transition(SHOW); // Only update if mounted
      })
      .catch(error => {
        if (isMounted.current) transition(ERROR_SAVE, true);
      });
  }

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        if (isMounted.current) transition(EMPTY); // Only update if mounted
      })
      .catch(error => {
        if (isMounted.current) transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student} // Use props.interview
          interviewer={props.interview.interviewer.id} // Use props.interview
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not book appointment." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment." onClose={back} />
      )}
    </article>
  );
}




// import React from "react";
// import "components/Appointment/styles.scss";
// import Header from "components/Appointment/Header";
// import Empty from "components/Appointment/Empty";
// import Show from "components/Appointment/Show";
// import useVisualMode from "hooks/useVisualMode";
// import Form from "./Form";
// import Confirm from "./Confirm";
// import Status from "./Status";
// import Error from "./Error";

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";
// const EDIT = "EDIT";
// const SAVING = "SAVING";
// const DELETING = "DELETING";
// const CONFIRM = "CONFIRM";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

// export default function Appointment(props) {
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//   function save(name, interviewer) {
//     const interviewData = {
//       student: name,
//       interviewer
//     };
  
//     transition(SAVING);
  
//     props.bookInterview(props.id, interviewData)
//       .then(() => transition(SHOW))
//       .catch(error => transition(ERROR_SAVE, true));
//   }
  
//   function destroy() {
//     transition(DELETING, true);
//     props.cancelInterview(props.id)
//       .then(() => transition(EMPTY))
//       .catch(error => transition(ERROR_DELETE, true));
//   }

//   return (
//     <article className="appointment" data-testid="appointment">
//       <Header time={props.time} />
//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === SHOW && (
//         <Show 
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={() => transition(CONFIRM)}
//           onEdit={() => transition(EDIT)}
//         />
//       )}
//       {mode === CREATE && (
//         <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
//       )}
//       {mode === EDIT && (
//         <Form
//           name={props.interview.student} // Use props.interview
//           interviewer={props.interview.interviewer.id} // Use props.interview
//           interviewers={props.interviewers}
//           onCancel={back}
//           onSave={save}
//         />
//       )}
//       {mode === SAVING && <Status message="Saving..." />}
//       {mode === DELETING && <Status message="Deleting..." />}
//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you would like to delete?"
//           onCancel={back}
//           onConfirm={destroy}
//         />
//       )}
//       {mode === ERROR_SAVE && (
//         <Error message="Could not book appointment." onClose={back} />
//       )}
//       {mode === ERROR_DELETE && (
//         <Error message="Could not cancel appointment." onClose={back} />
//       )}
//     </article>
//   );
// }




// import React, {useEffect, useRef } from "react";
// import "components/Appointment/styles.scss";
// import Header from "components/Appointment/Header";
// import Empty from "components/Appointment/Empty";
// import Show from "components/Appointment/Show";
// import useVisualMode from "hooks/useVisualMode";
// import Form from "./Form";
// import Confirm from "./Confirm";
// import Status from "./Status";
// import Error from "./Error";

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const CREATE = "CREATE";
// const EDIT = "EDIT";
// const SAVING = "SAVING";
// const DELETING = "DELETING";
// const CONFIRM = "CONFIRM";
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

// export default function Appointment(props) {
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//   const isMounted = useRef(true);

//   useEffect(() => {
//     return () => {
//       isMounted.current = false; // Mark as unmounted when the component unmounts
//     };
//   }, []);

//   function save(name, interviewer) {
//     const interviewData = {
//       student: name,
//       interviewer
//     };
  
//     transition(SAVING);
  
//     props.bookInterview(props.id, interviewData)
//       .then(() => transition(SHOW))
//       .catch(error => transition(ERROR_SAVE, true));
//   }
  
//   function destroy() {
//     transition(DELETING, true);
//     props.cancelInterview(props.id)
//       .then(() => transition(EMPTY))
//       .catch(error => transition(ERROR_DELETE, true));
//   }

//   return (
//     <article className="appointment" data-testid="appointment">
//       <Header time={props.time} />
//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === SHOW && (
//         <Show 
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={() => transition(CONFIRM)}
//           onEdit={() => transition(EDIT)}
//         />
//       )}
//       {mode === CREATE && (
//         <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
//       )}
//       {mode === EDIT && (
//         <Form
//           name={props.interview.student} // Use props.interview
//           interviewer={props.interview.interviewer.id} // Use props.interview
//           interviewers={props.interviewers}
//           onCancel={back}
//           onSave={save}
//         />
//       )}
//       {mode === SAVING && <Status message="Saving..." />}
//       {mode === DELETING && <Status message="Deleting..." />}
//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you would like to delete?"
//           onCancel={back}
//           onConfirm={destroy}
//         />
//       )}
//       {mode === ERROR_SAVE && (
//         <Error message="Could not book appointment." onClose={back} />
//       )}
//       {mode === ERROR_DELETE && (
//         <Error message="Could not cancel appointment." onClose={back} />
//       )}
//     </article>
//   );
// }