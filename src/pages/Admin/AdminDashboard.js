import React, { useEffect, useState } from "react";
import Sale_chart from "../../components/Charts/Sale_chart";
import Abandoned_chart from "../../components/Charts/Abandoned_chart";
import Revenue_chart from "../../components/Charts/Revenue_reports";
import Traffic_chart from "../../components/Charts/Traffic_chart";
import apiRequest from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Container } from "@mui/system";
import { Button, Card, TextField } from "@mui/material";
import * as FaIcons from "react-icons/fa";
import QuestionAnswerIcon from "@mui/icons-material/RateReview";
import QuizIcon from "@mui/icons-material/Quiz";
import ThreePIcon from "@mui/icons-material/ThreeP";
import CategoryIcon from "@mui/icons-material/Category";

export default function AdminDashboard() {
  const { t } = useTranslation();

  const [reports, setReports] = useState([
    {
      name: "Reports",
      usersCount: 0,
      blogsCount: 0,
      questionsCount: 0,
      categoriesCount: 0,
      graphData: [],
    },
  ]);
  const navigate = useNavigate();
  const data = [
    {
      name: "Reports 1",
      users: 20,
      blogs: 15,
      questions: 11,
      categories: 13,
    },
    {
      name: "Reports 2",
      users: 18,
      blogs: 10,
      questions: 12,
      categories: 15,
    },
    {
      name: "Reports 3",
      users: 10,
      blogs: 15,
      questions: 17,
      categories: 11,
    },
  ];
  const getReports = async () => {
    const response = await apiRequest({
      url: "user/reports",
      method: "GET",
    });
    if (response.success) {
      setReports(response.data);
    }
  };
  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <Grid container p={2} justifyContent={"center"} spacing={10}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={4}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item xs={12} md={3}>
              <Box
                bgcolor={"background.primary"}
                alignItems={"center"}
                justifyContent={"center"}
                p={3}
              >
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <ThreePIcon />
                  <Typography ml={1} fontSize={"24px"} color="text.primary">
                    {" "}
                    {reports.usersCount}
                  </Typography>
                </Typography>
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  color="text.primary"
                >
                  Users
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                bgcolor={"background.primary"}
                alignItems={"center"}
                justifyContent={"center"}
                p={3}
              >
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <QuestionAnswerIcon />
                  <Typography ml={1} fontSize={"24px"} color="text.primary">
                    {" "}
                    {reports.blogsCount}
                  </Typography>
                </Typography>
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  color="text.primary"
                >
                  Blogs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                bgcolor={"background.primary"}
                alignItems={"center"}
                justifyContent={"center"}
                p={3}
              >
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <QuizIcon />
                  <Typography ml={1} fontSize={"24px"} color="text.primary">
                    {" "}
                    {reports.questionsCount}
                  </Typography>
                </Typography>
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  color="text.primary"
                >
                  Questions
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                bgcolor={"background.primary"}
                alignItems={"center"}
                justifyContent={"center"}
                p={3}
              >
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CategoryIcon />
                  <Typography ml={1} fontSize={"24px"} color="text.primary">
                    {" "}
                    {reports.categoriesCount}
                  </Typography>
                </Typography>
                <Typography
                  fontSize={"24px"}
                  display={"flex"}
                  justifyContent={"center"}
                  color="text.primary"
                >
                  Categories
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <BarChart
              width={window.innerWidth / 1.25}
              height={window.innerHeight/1.8}
              data={reports.graphData}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
              <Bar dataKey="blogs" fill="#82ca9d" />
              <Bar dataKey="questions" fill="#bb86fc" />
            </BarChart>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
