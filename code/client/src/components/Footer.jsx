import React from 'react';

import styles from "../style/footer.module.css"
import {Box} from "@mui/material";

const Footer = () => {
    return (
        <Box className={styles.footer}>
          <span>
            Created by <a target="_blank" className={styles.link} href="https://github.com/khodosevich">BSUIR student</a>
          </span>
            <span className={styles.link}>|</span>
            <a target="_blank" className={styles.link} href="https://github.com/khodosevich/task-manager">Trello-clone</a>
        </Box>
    );
};

export default Footer;