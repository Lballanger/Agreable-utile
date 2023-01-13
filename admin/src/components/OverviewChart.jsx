import React, { useMemo, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getYearlySales } from '../redux/slices/statsSlice';

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function OverviewChart({ isDashboard = false, view }) {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { stats, isLoading, error } = useSelector((state) => state.statsSlice);

    useEffect(() => {
      if (!stats.yearlySales?.length) {
        dispatch(
          getYearlySales()
        );
      }
    }, [stats]);

    const [ totalSalesLine, totalUnitsLine ] = useMemo(() => {
      if (!stats.yearlySales) return [];

      const { yearlySales } = stats;
      
      
      const totalSalesLine = {
        id: "totalSales",
        color: theme.palette.secondary.main,
        data: [],
      };

      const totalUnitsLine = {
        id: "totalUnits",
        color: theme.palette.secondary[600],
        data: [],
      };
  
    Object.values(yearlySales).reduce(
      (acc, { month, totalsales, totalunits }) => {
        const curSales = acc.sales + totalsales;
        const curUnits = acc.units + totalunits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: `${monthNames[new Date(month).getMonth()]} ${new Date(month).getFullYear()}`, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: `${monthNames[new Date(month).getMonth()]} ${new Date(month).getFullYear()}` , y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

      return [[totalSalesLine], [totalUnitsLine]]
    }, [stats]);


    if (!stats.yearlySales || isLoading) return "Chargement...";

  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
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
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Mois",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${
              view === "sales" ? "des recettes" : "de produits vendues"
            } pour l'année.`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
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
            ]
          : undefined
      }
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
            <div>
              <strong>{slice.points[0].data.yFormatted} €</strong>
            </div>
          </div>
        );
      }}
    />
  );
}

export default OverviewChart;