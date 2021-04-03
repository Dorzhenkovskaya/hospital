import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/components/MainPage";
import PacientAll from "@/components/Pacient/PacientAll";
import Pacient from "@/components/Pacient/Pacient";
import RecordAll from "@/components/Record/RecordAll";
import Record from "@/components/Record/Record";
import Department from "@/components/Department/Department";
import DepartmentAll from "@/components/Department/DepartmentAll";
import Doctor from "@/components/Doctor/Doctor";
import DoctorAll from "@/components/Doctor/DoctorAll";

Vue.use(Router);

const router = new Router({
    mode: 'history', // Use browser history
    routes: [

        {
            path: "",
            name: "MainPage",
            component : MainPage
        },
        {
            path: "/pacients",
            name: "PacientAll",
            component: PacientAll,
        },
        {
            path: "/pacients/:id",
            name: "Pacient Details",
            component: Pacient,
        },
        {
            path: "/records",
            name: "RecordAll",
            component: RecordAll,
        },
        {
            path: "/records/:id",
            name: "Record Details",
            component: Record,
        },
        {
            path: "/departments",
            name: "DepartmentAll",
            component: DepartmentAll,
        },
        {
            path: "/departments/:id",
            name: "Department Details",
            component: Department,
        },
        {
            path: "/doctors",
            name: "DoctorAll",
            component: DoctorAll,
        },
        {
            path: "/doctors/:id",
            name: "Doctor Details",
            component: Doctor,
        },
    ]
});

export default router;