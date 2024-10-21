const fixtures = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    4: { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  },
};


const resetFixtures = () => {
  // Reset days
  fixtures.days = [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ];

  // Reset appointments
  fixtures.appointments = {
    1: { id: 1, time: "12pm", interview: null },
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    4: { id: 4, time: "3pm", interview: null },
  };

  // Reset interviewers
  fixtures.interviewers = {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  };
};


// USING IF STATEMENT. FOLLOWING COMPASS.
export default {
  defaults: { baseURL: "" },//Add this line if error is TypeError: Cannot set property 'baseURL' of undefined
  get: jest.fn((url) => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days,
      });
    }

    if (url === "/api/appointments") {
      /* Resolve appointments data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments,
      });
    }

    if (url === "/api/interviewers") {
      /* Resolve interviewers data */
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers,
      });
    }
  }),

  // Adding the PUT method
  put: jest.fn((url, data) => {
    return new Promise((resolve, reject) => {
      if (url.startsWith("/api/appointments/")) {
        const appointmentId = parseInt(url.split("/").pop()); // Extracting the appointment ID from the URL. /api/appointments/1. The output is 1
        if (fixtures.appointments[appointmentId]) {
          fixtures.appointments[appointmentId].interview = data.interview; // Update the appointment
          resolve({
            status: 204,
            statusText: "No Content",
          });
        } else {
          reject(new Error("Appointment not found"));
        }
      } else {
        reject(new Error("Invalid URL"));
      }
    });
  }),
  
  delete: jest.fn((url) => {
    return new Promise((resolve, reject) => {
      //console.log("Delete URL:", url); // Log the incoming URL
  
      if (url.startsWith("/api/appointments/")) {
        const appointmentId = parseInt(url.split("/").pop());
        //console.log("Parsed appointment ID:", appointmentId); // Log parsed ID
        const appointment = fixtures.appointments[appointmentId];
  
        if (appointment) {
          //console.log("Appointment found:", appointment);
          
          // Remove the appointment from fixtures
          delete fixtures.appointments[appointmentId];
  
          // Find the day that contains the deleted appointment
          Object.values(fixtures.days).forEach(day => {
            if (day.appointments.includes(appointmentId)) {
              //console.log("includes appointmentID: ", day.appointments.includes(appointmentId));
              //console.log("EXISTING spots:", day.name, day.spots);
  
              // **Before filtering**
              //console.log("BEFORE filtering, day.appointments:", day.appointments);
              //console.log("BEFORE filtering, day.spots:", day.spots);
              
              // Remove the appointment ID from the day's appointments
              day.appointments = day.appointments.filter(id => id !== appointmentId);
              
              // **After filtering**
              //console.log("AFTER filtering, updated day.appointments:", day.appointments);
              // Increment the spots for that day
              day.spots += 1; 
              //console.log("AFTER DELETE, updated day spots: ", day.spots);
            }
          });
  
          resolve({
            status: 204,
            statusText: "No Content",
          });
        } else {
          reject(new Error("Appointment not found"));
        }
      } else {
        reject(new Error("Invalid URL"));
      }
    });
  }),
  
  resetFixtures,
};