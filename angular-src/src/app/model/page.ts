/**
 * An object used to get page information from the server
 */
export class Page {
    //The number of elements in the page
    size: number = 0;
    //The total number of elements
    totalElements: number = 0;
    //The total number of pages
    totalPages: number = 0;
    //The current page number
    pageNumber: number = 0;
    //Column class for pagination
    customClasses = {
        sortAscending: 'glyphicon glyphicon-sort-asc',
        sortDescending: 'glyphicon glyphicon-sort-desc',
        pagerLeftArrow: 'glyphicon glyphicon-chevron-left',
        pagerRightArrow: 'glyphicon glyphicon-chevron-right',
        pagerPrevious: 'glyphicon glyphicon-step-backward',
        pagerNext: 'glyphicon glyphicon-step-forward'
    };
}