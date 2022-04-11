import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { kanbanChangeStatus, kanbanView } from "services/caseService"
import styles from '../../../public/styles/Kanban.module.scss'
import debounce from 'lodash.debounce';

import { useStoreFilter } from "store/filter/FilterProvider"
import { useStoreFilter as useStoreFilterResolutionArea } from "store/filterResolutionAreas/FilterProvider"

const Kanban = ({module}:any) => {
    const storeFilter = useStoreFilter();
    const storeFilterResolutionArea = useStoreFilterResolutionArea();
    const [cols, setCols] = useState<object>({})

    useEffect(() => {
        kanbanView(module, storeFilter.type, storeFilterResolutionArea.type)
            .then( (data:any) => {
                setCols(data)
            })
            .catch((e:any) => console.log(e));
    }, [storeFilter, storeFilterResolutionArea])

    const onDragEnd = (result:any, cols:any, setCols:any) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceCol = cols[source.droppableId]
            const destCol = cols[destination.droppableId]
            const sourceItems = [...sourceCol.items]
            const destItems = [...destCol.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems
                }
            })

            let order = destItems.findIndex( item => item.id == result.draggableId);
            changeStatusSave(result.draggableId, destCol.id)
        } else {
            // ESTA PARTE ORDENA LAS CARTS PARA PRIORIZAR

            // const columns = cols[source.droppableId]
            // const _items = [...columns.items]
            // const [removed] = _items.splice(source.index, 1)
            // _items.splice(destination.index, 0, removed)
            // setCols({
            //     ...cols,
            //     [source.droppableId]: {
            //         ...columns,
            //         items: _items
            //     }
            // })

            // let order = _items.findIndex( item => item.id == result.draggableId);
            // changeStatusSave(result.draggableId, columns.id, order)
        }
    }

    const changeStatusSave = useCallback(
        debounce((caseId:any, statusId:any) => {
            let dataChange = { caseId, statusId}
            kanbanChangeStatus(module, dataChange)
            .then( (data:any) => {})
            .catch((e:any) => console.log(e));
        }, 300), []
    )

    return (
        <div className={styles.container}>
            <DragDropContext onDragEnd={(result) => {
                onDragEnd(result, cols, setCols)
            }}>
                {Object.entries(cols).map(([id, col], index) => (
                    <div className={styles.containerDroppable} key={index}>
                        <div className={styles.titleContainer} 
                            style={{
                                background: col?.color,
                                borderColor: "#c7e8ce",
                                borderTop: `4px solid ${col?.borderColor}`
                            }}>
                            <div className={styles.title}>
                                {col?.name}
                            </div>
                            <div className={styles.subtitle}>
                                {col.items.length} Casos
                            </div>
                        </div>
                        <div style={{ marginLeft: "8px" }}>
                            <Droppable droppableId={id} key={id}>
                                {(provider, snapshot) => (
                                    <div {...provider.droppableProps}
                                        className={styles.droppable}
                                        style={{
                                            backgroundColor: snapshot.isDraggingOver ? "#EDE685" : "#EBEBEB",                                            
                                        }}
                                        ref={provider.innerRef}>
                                        {col.items.map((item:any, index:any) => (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provider, snapshot) => (
                                                    <div ref={provider.innerRef}
                                                        {...provider.dragHandleProps}
                                                        {...provider.draggableProps}
                                                        className={styles.draggable}
                                                        style={{ backgroundColor: "#fff",  ...provider.draggableProps.style}}
                                                        // style={{
                                                        //     backgroundColor: snapshot.isDragging ? "#FFF" : "#EBEBEB",
                                                        //     ...provider.draggableProps.style
                                                        // }}
                                                    >
                                                        <Link href={ `/${module}/show/${item.id}` }>
                                                            <a style={{textDecoration: 'none', color:'#000'}}>
                                                                <div>{item.issue }</div>
                                                                <div>{item.ticketNumber }</div>
                                                                <div>{item.type }</div>
                                                                <div>{item.subtype }</div>
                                                                <div>{item.resolutionAreas.join(',') }</div>
                                                                <div>{item.resolver.join(',') }</div>
                                                            </a>
                                                        </Link>
                                                        
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provider.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
}
  
export default Kanban