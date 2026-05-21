import React from 'react'

export const GridPlantilla = ({ rowsFile, styleBox, header, area3,area1, area2, main }) => {
    return (
        <div className={`text-foreground grid grid-cols-1 ${rowsFile} gap-1 py-2 px-3`}>
            {header &&
                <header className={styleBox}>
                    {header}
                </header>}

            {area3 &&
                <section className={styleBox}>
                    {area3}
                </section>
            }

            {area1 &&
                <section className={styleBox}>
                    {area1}
                </section>
            }

            {area2 &&
                <section className={styleBox}>
                    {area2}
                </section>
            }

            {main &&
                <section className={styleBox}>
                    {main}
                </section>
            }

        </div>
    )
}