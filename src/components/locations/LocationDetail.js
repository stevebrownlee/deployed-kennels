import React, { useContext } from "react"
import { useOxfordList } from "../../hooks/string/useOxfordList"

import { AnimalContext } from "../providers/AnimalProvider"
import { EmployeeContext } from "../providers/EmployeeProvider"
import { LocationContext } from "../providers/LocationProvider"
import "./Location.css"


export default props => {
    const { animals } = useContext(AnimalContext)
    const { employees } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)

    const locationId = parseInt(props.match.params.locationId)
    const location = locations.find(a => a.id === locationId) || {}
    const locationAnimals = animals.filter(a => a.locationId === locationId)
    const locationEmployees = employees.filter(e => e.locationId === locationId)

    return (
        <div className="jumbotron">
            <h1 className="display-4">{location.name}</h1>
            <p className="lead">
                {
                    `Currently caring for ${useOxfordList(locationAnimals)}`
                }
            </p>
            <hr className="my-4" />
            <p>
                {
                    `We currently have ${locationEmployees.length}
                    well-trained animal lovers and trainers:`
                }
            </p>
            <p>{useOxfordList(locationEmployees)}</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
    )
}
