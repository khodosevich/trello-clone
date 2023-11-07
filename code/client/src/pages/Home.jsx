import React, {useEffect, useState} from 'react'
import {Box} from "@mui/material";

import classes from "../style/home.module.css"

import cards from "../json/productivity-card.json"
import CardProductivity from "../components/CardProductivity";
import CardAction from "../components/CardAction";
import axios from "axios";
import RegisterForm from "../components/RegisterForm";

const Home = () => {


    const [products, setProducts] = useState([])

    const fetchData = async () => {
        await axios.get("./action-cards.json").then(response => {
            setProducts(response.data)
        })
    }

    useEffect(() => {
        fetchData()
    }, []);

    return(<>
            <Box className={classes.home_landing}>
                <Box className={classes.home_content}>
                    <Box className={classes.home_content_left}>
                        <h1 className={classes.home_content_left_title}>
                            Trello brings all your tasks, teammates, and tools together
                        </h1>
                        <p className={classes.home_content_left_subtitle}>
                            Keep everything in the same place—even if your team isn’t.
                        </p>
                        <RegisterForm/>
                    </Box>
                    <Box className={classes.home_content_right}>
                        <img className={classes.home_content_right_img} src="./assets/TrelloUICollage_4x.webp" alt=""/>
                    </Box>
                </Box>
                <img className={classes.bg_wave} src="./assets/white-wave-bg.svg" alt=""/>
            </Box>
            <Box className={classes.productivity_content}>
                <Box className={classes.home_container}>
                    <h2 className={classes.productivity_content_title}>
                        A productivity powerhouse
                    </h2>
                    <p className={classes.productivity_content_subtitle}>
                        Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done.
                    </p>

                    <Box className={classes.productivity_content_cards}>
                        {
                            cards.map((item,index) => (
                                <CardProductivity key={index} card={item}/>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
            <Box className={classes.action_content}>
                <Box className={classes.home_container}>
                    <h2 className={classes.action_content_title}>
                        Trello in action
                    </h2>
                    <p className={classes.action_content_subtitle}>
                        Workflows for any project, big or small
                    </p>
                    <Box className={classes.action_cards}>
                        {
                            products.map((item,index) => (
                                <CardAction card={item} key={index}/>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
            <Box className={classes.company_partner_content}>
                <Box className={classes.home_container}>
                    <Box className={classes.company_partner_content_adaptive}>
                        <p className={classes.company_partner_title}>Join over 2,000,000 teams worldwide that are using Trello to get more done.</p>
                        <img className={classes.company_partner_img} src="./assets/company.svg" alt=""/>
                        <img className={classes.company_partner_img_adaptive} src="./assets/company_adaptive.svg" alt=""/>
                    </Box>
                </Box>
            </Box>

            <Box className={classes.start_taskmanager_content}>
                <img className={classes.start_taskmanager_left_img}  src="./assets/BigSwingFooterHeroGraphic__Left.svg" alt=""/>
                <Box className={classes.home_container}>
                    <p className={classes.start_taskmanager_title}>Get started with Us today</p>
                    <RegisterForm/>
                </Box>
                <img className={classes.start_taskmanager_right_img}  src="./assets/BigSwingFooterHeroGraphic__Right.svg" alt=""/>
            </Box>
        </>
    )

}

export default Home;