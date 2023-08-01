import {
  Button,
  Card,
  Grid,
  IconButton,
  styled,
  Snackbar,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarMonth,
  Call,
  Close,
  Delete,
  Edit,
  GpsFixedOutlined,
  LocationOn,
} from "@mui/icons-material";
import moment from "moment";
import EventDialog from "./EventDialog";
import AlertDeleteDialog from "./AlertDeleteDialog";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { DragDropContext } from "react-dnd";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import events from "./events";
import httpclient from "../../utils/httpClient";
import MuiAlert from "@mui/material/Alert";
// import { scheduleData } from "./data";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EventStyleDiv = styled("div")(({ theme }) => ({
  height: "680px",
  overflowY: "auto",
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
}));

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const InternalActivities = () => {
  // const [calendarData, setCalendarData] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackStatus, setSnackStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventData, setEventData] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  // const [myEvents, setMyEvents] = useState(events);
  const [myEvents, setMyEvents] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState();
  const [scheduleData, setScheduledData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleID, setVisibleID] = useState("");
  // useEffect(() => {
  //   setCalendarData(scheduleData);
  // }, [scheduleData]);
  useEffect(() => {
    getAllNewEvents();
    getCalendarEvents();
    getPageVisible();
  }, []);

  const getPageVisible = () => {
    httpclient.get("internal_activity_visible").then(({ data }) => {
      if (data) {
        setVisibleID(data.data[0]._id);
        setVisible(data.data[0].pageVisible);
      }
    });
  };

  const getAllNewEvents = () => {
    httpclient.get("new_events").then(({ data }) => {
      if (data.success) {
        // setScheduledData(data.data)
        let newData = [];
        data.data.map((eve) => {
          eve.start = new Date(eve.start);
          eve.end = new Date(eve.end);
          newData.push(eve);
        });
        setScheduledData(newData);
      }
    });
  };

  const getCalendarEvents = () => {
    httpclient.get("calendar_events").then(({ data }) => {
      if (data.success) {
        let newData = [];
        data.data.map((eve) => {
          eve.start = new Date(eve.start);
          eve.end = new Date(eve.end);
          newData.push(eve);
        });
        setMyEvents(newData);
      }
    });
  };

  function eventStyleGetter(event, start, end, isSelected) {
    // console.log(event);
    // var backgroundColor = '#' + event.hexColor;
    var backgroundColor = "rgb(63, 81, 181)";
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "5px",
      // opacity: 0.8,
      color: "#fff",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  }

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);

  const handleDragStart = useCallback((event) => setDraggedEvent(event), []);

  const customOnDragOver = useCallback(
    (dragEvent) => {
      // check for undroppable is specific to this example
      // and not part of API. This just demonstrates that
      // onDragOver can optionally be passed to conditionally
      // allow draggable items to be dropped on cal, based on
      // whether event.preventDefault is called
      if (draggedEvent !== "undroppable") {
        // console.log("preventDefault");
        dragEvent.preventDefault();
      }
    },
    [draggedEvent]
  );

  const onDropFromOutside = useCallback(
    ({ start, end, id, title, location, bookable }) => {
      if (draggedEvent === "undroppable") {
        setDraggedEvent(null);
        return;
      }
      // console.log("draggedEvent", draggedEvent);
      const { name } = draggedEvent;
      const event = {
        // title: formatName(name, counters[name]),
        id: draggedEvent.id,
        title: draggedEvent.title,
        location: draggedEvent.location,
        bookable: draggedEvent.bookable,
        start,
        end,
      };
      setDraggedEvent(null);
      // setCounters((prev) => {
      //   const { [name]: count } = prev
      //   return {
      //     ...prev,
      //     [name]: count + 1,
      //   }
      // })
      // newEvent(event)
      httpclient
        .post("calendar_events", {
          title: event.title,
          location: event.location,
          bookable: event.bookable,
          // start: new Date(Date.parse(event.start)),
          // end: new Date(Date.parse(event.end)),
          start: event.start,
          end: event.end,
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            getCalendarEvents();

            // myEvents.push(event);
            // setTimeout(() => {
            //   navigate("/internal_activities");
            // }, 1000);
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        });
      // myEvents.push(event);
    },
    [draggedEvent, setDraggedEvent]
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;

      // if (!allDay && droppedOnAllDaySlot) {
      //   event.allDay = true;
      // }

      // setMyEvents((prev) => {
      //   const existing = prev.find((ev) => ev.id === event.id) ?? {};
      //   const filtered = prev.filter((ev) => ev.id !== event.id);
      //   return [...filtered, { ...existing, start, end, allDay }];
      // });
      httpclient
        .put(`calendar_events/${event._id}`, {
          title: event.title,
          location: event.location,
          start: new Date(start),
          end: new Date(end),
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            getCalendarEvents();

            // myEvents.push(event);
            // setTimeout(() => {
            //   navigate("/internal_activities");
            // }, 1000);
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        });
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      // setMyEvents((prev) => {
      //   console.log('prev', prev);
      //   const existing = prev.find((ev) => ev.id === event.id) ?? {};
      //   const filtered = prev.filter((ev) => ev.id !== event.id);
      //   return [...filtered, { ...existing, start, end }];
      // });
      httpclient
        .put(`calendar_events/${event._id}`, {
          title: event.title,
          location: event.location,
          bookable: event.bookable,

          // start: new Date(Date.parse(start)),
          // end: new Date(Date.parse(end)),
          start: start,
          end: end,
        })
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            getCalendarEvents();

            // myEvents.push(event);
            // setTimeout(() => {
            //   navigate("/internal_activities");
            // }, 1000);
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        });
    },
    [setMyEvents]
  );

  const defaultDate = useMemo(() => new Date());

  const handleAddNewevent = (event) => {
    console.log("event new>>>", event);
    setDialogOpen(true);
    setEventData(event);
  };

  const handleAddNeweventSchedule = (event) => {
    setIsScheduled(true);
    setDialogOpen(true);
    setEventData(event);
  };

  const callBackEvent = (child) => {
    console.log("childddd", child);
    if (child.open === false) {
      setDialogOpen(false);
      setEventData("");
      setIsScheduled(false);
    }

    if (child.save === true) {
      setDialogOpen(false);
      setEventData("");
      //for adding event on left column
      if (isScheduled === true) {
        if (child.id) {
          httpclient
            .put(`new_events/${child.id}`, {
              title: child.title,
              location: child.location,
              bookable: child.bookable,
              start: child.startDate,
              end: child.endDate,
              // start: child.start,
              // end: child.end
            })
            .then(({ data }) => {
              if (data.success) {
                setOpen(true);
                setSnackStatus("success");
                setSnackMessage(data.message);
                getAllNewEvents();

                // scheduleData.map((cal, index) => {
                //   if(cal.id === child.id) {
                //     cal.title = child.title;
                //     cal.location = child.location;
                //     cal.start = child.start;
                //     cal.end = child.end;
                //     cal.bookable = child.bookable;
                //   }
                // })
              } else {
                setOpen(true);
                setSnackStatus("error");
                setSnackMessage(data.message);
              }
            });
        } else {
          httpclient
            .post(`new_events`, {
              title: child.title,
              location: child.location,
              bookable: child.bookable,
              // start: new Date(Date.parse(child.start)),
              // end: new Date(Date.parse(child.end)),
              // start: child.start,
              // end: child.end,
              start: child.startDate,
              end: child.endDate,
            })
            .then(({ data }) => {
              if (data.success) {
                setOpen(true);
                setSnackStatus("success");
                setSnackMessage(data.message);
                getAllNewEvents();

                // let newData = {
                //   id: Math.random(),
                //   title: child.title,
                //   location: child.location,
                //   start: child.start,
                //   end: child.end,
                //   bookable: child.bookable,
                // };

                // scheduleData.push(newData);
              } else {
                setOpen(true);
                setSnackStatus("error");
                setSnackMessage(data.message);
              }
            });
        }
        setIsScheduled(false);
      } else {
        if (child.id) {
          httpclient
            .put(`calendar_events/${child.id}`, {
              title: child.title,
              location: child.location,
              bookable: child.bookable,
              // start: new Date(Date.parse(child.start)),
              // end: new Date(Date.parse(child.end)),
              start: child.startDate,
              end: child.endDate,
              // start: child.start,
              // end: child.end
            })
            .then(({ data }) => {
              if (data.success) {
                setOpen(true);
                setSnackStatus("success");
                setSnackMessage(data.message);
                getCalendarEvents();

                // myEvents.map((cal, index) => {
                //   if (cal.id === child.id) {
                //     cal.title = child.title;
                //     cal.location = child.location;
                //     cal.start = child.start;
                //     cal.end = child.end;
                //     cal.bookable = child.bookable;
                //   }
                // });
              } else {
                setOpen(true);
                setSnackStatus("error");
                setSnackMessage(data.message);
              }
            });
        } else {
          httpclient
            .post(`calendar_events`, {
              title: child.title,
              location: child.location,
              bookable: child.bookable,
              // start: new Date(Date.parse(child.start)),
              // end: new Date(Date.parse(child.end)),
              start: child.startDate,
              end: child.endDate,
            })
            .then(({ data }) => {
              if (data.success) {
                setOpen(true);
                setSnackStatus("success");
                setSnackMessage(data.message);
                getCalendarEvents();

                // let newData = {
                //   id: Math.random(),
                //   title: child.title,
                //   location: child.location,
                //   start: child.start,
                //   end: child.end,
                //   bookable: child.bookable,
                // };
                // myEvents.push(newData);
              } else {
                setOpen(true);
                setSnackStatus("error");
                setSnackMessage(data.message);
              }
            });
        }
        setIsScheduled(false);
      }
    }

    if (child.delete === true) {
      setDialogOpen(false);
      setDeleteDialogOpen(true);
      setEventData(child);
    }
  };

  const handleEdit = (e, data) => {
    setDialogOpen(true);
    setEventData(data);
    setIsScheduled(true);
  };

  const handleDelete = (e, data) => {
    setDeleteDialogOpen(true);
    setEventData(data);
    setIsScheduled(true);
  };

  const deleteEvent = (data) => {
    // console.log('deleted data', data);
    if (isScheduled) {
      httpclient
        .delete(`new_events/${data._id || data.id}`)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setEventData("");
            setIsScheduled(false);
            getAllNewEvents();
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        });

      // let updated = scheduleData.filter((cal) => cal.id !== data.id);
      // setMyEvents(updated);
    } else {
      httpclient
        .delete(`calendar_events/${data._id || data.id}`)
        .then(({ data }) => {
          if (data.success) {
            setOpen(true);
            setSnackStatus("success");
            setSnackMessage(data.message);
            setEventData("");
            getCalendarEvents();
          } else {
            setOpen(true);
            setSnackStatus("error");
            setSnackMessage(data.message);
          }
        });
      setIsScheduled(false);

      // let updated = myEvents.filter((cal) => cal.id !== data.id);
      // // setCalendarData(updated);
      // setMyEvents(updated);
      // setEventData("");
    }
  };

  const sendDeleteCall = (call) => {
    if (call.open === false) {
      setDeleteDialogOpen(false);
      setEventData("");
      setIsScheduled(false);
    }
    if (call.delete === true) {
      setDeleteDialogOpen(false);
      deleteEvent(eventData);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // let newerEvents = myEvents.map(({start,end,...rest}) => ({
  //   start: new Date(Date.parse(start)),
  //   end: new Date(Date.parse(end)),
  //   ...rest
  // }))
  // console.log('event data????', eventData);

  const handlePageVisible = (e) => {
    console.log("visible", e.target.checked);
    setVisible(e.target.checked);
    httpclient
      .put(`/internal_activity_visible/${visibleID}`, {
        pageVisible: e.target.checked,
      })
      .then(({ data }) => {
        if (data.success) {
          setOpen(true);
          setSnackStatus("success");
          setSnackMessage(data.message);
        } else {
          setOpen(true);
          setSnackStatus("error");
          setSnackMessage(data.message);
        }
      });
  };

  // console.log('myEvents',myEvents)

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={4}>
          <h2>Events</h2>
          <EventStyleDiv>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleAddNeweventSchedule}
              sx={{ marginBottom: "20px" }}
            >
              Add New Event
            </Button>
            {scheduleData &&
              scheduleData.map((schedule) => (
                <Card
                  key={schedule.id}
                  sx={{ marginBottom: "20px", cursor: "pointer" }}
                  draggable="true"
                  onDragStart={() => handleDragStart(schedule)}
                >
                  <div
                    style={{
                      background: "#3f51b5",
                      padding: "15px",
                      color: "#fff",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <IconButton onClick={(e) => handleEdit(e, schedule)}>
                        <Edit fontSize="small" style={{ color: "#fff" }} />
                      </IconButton>
                      <IconButton onClick={(e) => handleDelete(e, schedule)}>
                        <Delete fontSize="small" style={{ color: "#fff" }} />
                      </IconButton>
                    </div>
                    <h4 style={{ margin: "0" }}>{schedule.title}</h4>
                  </div>
                  <div style={{ padding: "15px", opacity: "0.8" }}>
                    <div>
                      <CalendarMonth
                        fontSize="small"
                        style={{
                          marginRight: "5px",
                          position: "relative",
                          top: "4px",
                        }}
                      />
                      {moment(schedule.start).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </div>
                    <div>
                      <LocationOn
                        fontSize="small"
                        style={{
                          position: "relative",
                          top: "4px",
                          marginRight: "5px",
                        }}
                      />
                      {schedule.location}
                    </div>
                  </div>
                </Card>
              ))}
          </EventStyleDiv>
        </Grid>
        <Grid item sm={12} md={8}>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <h2>Calendar</h2>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={handlePageVisible}
                      value={visible}
                      checked={visible}
                    />
                  }
                  label="Page Visible in App"
                />
              </FormGroup>
            </Box>
          </Box>
          <div style={{ height: "680px", overflowY: "auto" }}>
            <DragAndDropCalendar
              selectable={true}
              dragFromOutsideItem={draggedEvent}
              onDropFromOutside={onDropFromOutside}
              defaultDate={defaultDate}
              defaultView={Views.MONTH}
              // defaultView="week"
              events={myEvents}
              localizer={localizer}
              onDragOver={customOnDragOver}
              onEventDrop={moveEvent}
              onEventResize={resizeEvent}
              onSelectEvent={(event) => handleAddNewevent(event)}
              onSelectSlot={handleAddNewevent}
              eventPropGetter={eventStyleGetter}
              popup
              resizable
            />
          </div>
        </Grid>
      </Grid>

      {dialogOpen && (
        <EventDialog callBackEvent={callBackEvent} eventData={eventData} />
      )}
      {deleteDialogOpen && (
        <AlertDeleteDialog sendDeleteCall={sendDeleteCall} />
      )}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackStatus}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InternalActivities;
