import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/components/MainPage";
import PatientAll from "@/components/Patient/PatientAll";
import Patient from "@/components/Patient/Patient";
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
            component: MainPage
        },
        {
            path: "/patients",
            name: "PatientAll",
            component: PatientAll,
        },
        {
            path: "/patients/:id",
            name: "Patient Details",
            component: Patient,
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