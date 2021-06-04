import React from "react";
import {Pagination} from "@material-ui/lab";

type PaginatorPropsType = {
    pagesCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator:React.FC<PaginatorPropsType> = (props) => {

    const {pagesCount, currentPage, onPageChanged}=props

    const onPageChangedHandler = (event: React.ChangeEvent<any>, value: number) => {
        onPageChanged(value)
    }

    return <>

        {pagesCount === 0 ?
            <></>
            : < Pagination count={pagesCount} page={currentPage}
                           onChange={onPageChangedHandler}
                           showFirstButton showLastButton/>
        }
    </>
}