"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [priorityNotifications, setPriorityNotifications] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://4.224.186.213/evaluation-service/notifications";

  async function fetchNotifications() {
    setLoading(true);

    try {
      let url = `${API_URL}?limit=${limit}&page=${page}`;

      if (type !== "") {
        url += `&notification_type=${type}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      let list = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (data.notifications) {
        list = data.notifications;
      } else if (data.data) {
        list = data.data;
      }

      setNotifications(list);

      const priorityList = [...list]
        .sort((a, b) => {
          const weightA = a.weight || a.priority || 0;
          const weightB = b.weight || b.priority || 0;
          return weightB - weightA;
        })
        .slice(0, 5);

      setPriorityNotifications(priorityList);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchNotifications();
  }, [page, limit, type]);

  function getNotificationTitle(notification) {
    return (
      notification.title ||
      notification.message ||
      notification.notification_title ||
      "No Title"
    );
  }

  function getNotificationType(notification) {
    return notification.notification_type || notification.type || "General";
  }

  function isViewed(notification) {
    return notification.viewed || notification.read || false;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Campus Notification System
      </Typography>

      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        Stage 2 - React Frontend
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginTop: 4,
          marginBottom: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Notification Type</InputLabel>
          <Select
            value={type}
            label="Notification Type"
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Limit</InputLabel>
          <Select
            value={limit}
            label="Limit"
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={fetchNotifications}>
          Refresh
        </Button>
      </Box>

      {loading && (
        <Box sx={{ textAlign: "center", margin: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <Typography variant="h4" gutterBottom>
        Priority Notifications
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        {priorityNotifications.map((notification, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ borderLeft: "6px solid orange" }}>
              <CardContent>
                <Typography variant="h6">
                  {getNotificationTitle(notification)}
                </Typography>

                <Box sx={{ marginTop: 1 }}>
                  <Chip
                    label={getNotificationType(notification)}
                    color="primary"
                    sx={{ marginRight: 1 }}
                  />

                  <Chip
                    label={isViewed(notification) ? "Viewed" : "New"}
                    color={isViewed(notification) ? "default" : "success"}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      <Grid container spacing={2}>
        {notifications.map((notification, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                backgroundColor: isViewed(notification) ? "#f5f5f5" : "#e8f5e9",
                borderLeft: isViewed(notification)
                  ? "6px solid gray"
                  : "6px solid green",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {getNotificationTitle(notification)}
                </Typography>

                <Box sx={{ marginTop: 1 }}>
                  <Chip
                    label={getNotificationType(notification)}
                    color="primary"
                    sx={{ marginRight: 1 }}
                  />

                  <Chip
                    label={isViewed(notification) ? "Viewed" : "New"}
                    color={isViewed(notification) ? "default" : "success"}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          marginTop: 4,
        }}
      >
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <Typography variant="h6">Page {page}</Typography>

        <Button variant="outlined" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Container>
  );
}