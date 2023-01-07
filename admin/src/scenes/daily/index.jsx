import React, { useState, useMemo, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import DatePicker, { registerLocale } from "react-datepicker";
import { ResponsiveLine } from "@nivo/line";
import "react-datepicker/dist/react-datepicker.css";
import { getDailySales } from "../../redux/slices/statsSlice";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

function Daily() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { stats, isLoading, error } = useSelector(
      (state) => state.statsSlice
    );

    const [startDate, setStartDate] = useState(new Date("2022-06-01"));
    const [endDate, setEndDate] = useState(new Date("2023-01-07"));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      if (!stats.dailySales.length) {
        dispatch(
          getDailySales({
            startDate: startDate,
            endDate: endDate,
          })
        );
        setIsLoaded(true);
      }
      if (isLoaded) {
        dispatch(
          getDailySales({
            startDate: startDate,
            endDate: endDate,
          })
        );
      }
    }, [startDate, endDate]);




    const [formatttedData] = useMemo(() => {
          if (!stats) return [];

          const { dailySales } = stats;

          const totalSalesLine = {
            id: "Recettes",
            color: theme.palette.secondary.main,
            data: [],
          };

          const totalUnitsLine = {
            id: "Produits vendus",
            color: theme.palette.secondary[600],
            data: [],
          };

          Object.values(dailySales).forEach(
            ({ date, totalsales, totalunits }) => {
              const dateFormatted = new Date(date);
              if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const dateFormat = new Date(date).toLocaleDateString("fr-FR", {
                  timeZone: "Europe/Paris",
                });;

                totalSalesLine.data = [
                  ...totalSalesLine.data,
                  { x: dateFormat, y: totalsales },
                ];

                totalUnitsLine.data = [
                  ...totalUnitsLine.data,
                  { x: dateFormat, y: totalunits },
                ];
              }
            }
          );

          const formattedData = [totalSalesLine, totalUnitsLine];

          return [formattedData];
}, [stats, startDate, endDate]);  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Ventes quotidiennes" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              setDefaultLocale
              locale="fr"
              dateFormat={"dd/MM/yyyy"}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              setDefaultLocale
              locale="fr"
              dateFormat={"dd/MM/yyyy"}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>
        {stats ? (
          <ResponsiveLine
            data={formatttedData}
            theme={{
              dots: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                    fontSize: 12,
                  },
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
              labels: {
                text: {
                  fill: "#fff",
                },
              },
            }}
            color={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              legend: "Mois",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                itemTextColor: theme.palette.secondary[200],
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            enablePointLabel
            enableSlices="x"
            sliceTooltip={({ slice }) => {
              return (
                <div
                  style={{
                    background: "white",
                    color: "black",
                    padding: "9px 12px",
                    border: "1px solid #ccc",
                  }}
                >
                  <div>{slice.points[0].data.xFormatted}</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        backgroundColor: slice.points[0].serieColor,
                        height: "0.8rem",
                        width: "0.8rem",
                        borderRadius: "100%",
                        marginRight: "0.5rem",
                      }}
                    />
                    <div>Produits vendues : </div>
                    <strong style={{ marginLeft: "0.3rem" }}>
                      {parseInt(slice.points[0].data.yFormatted, 10)}
                    </strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        backgroundColor: slice.points[1].serieColor,
                        height: "0.8rem",
                        width: "0.8rem",
                        borderRadius: "100%",
                        marginRight: "0.5rem",
                      }}
                    />
                    <div>Recette : </div>
                    <strong style={{ marginLeft: "0.3rem" }}>
                      {slice.points[1].data.yFormatted} €
                    </strong>
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Daily;
