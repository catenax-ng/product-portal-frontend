import { Button, Table } from "cx-portal-shared-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux";
import { fetchDigitalTwins } from "state/features/digitalTwins/actions";
import { twinsSelector } from "state/features/digitalTwins/slice";
import { ShellDescriptor } from "state/features/digitalTwins/types";
import { DigitalTwinsTableColumns } from "./DigitalTwinsTableColumns";

interface TwinTableProps {
  onTwinSelect: (id: string) => void
}

const TwinTable = ({ onTwinSelect }: TwinTableProps ) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { twinList, loading } = useSelector(twinsSelector);
  const [twins, setTwins] = useState<ShellDescriptor[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const rowCount = 10;

  useEffect(() => {
    dispatch(fetchDigitalTwins({filter: { page: pageNumber, pageSize: rowCount }}));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    setTwins((prevTwins) => prevTwins.concat(twinList.items))
  }, [twinList])

  const onSearch = (value: string) => {
    console.log(value);
  }

  const columns = DigitalTwinsTableColumns(useTranslation, onTwinSelect);

  return(
    <section>
      <Table
        rowsCount={twinList.totalItems}
        hideFooter
        loading={loading}
        disableSelectionOnClick={true}
        title={t('content.digitaltwin.table.title')}
        toolbar={{
          onSearch: onSearch,
        }}
        columns={columns}
        rows={twins}
        getRowId={(row) => row.identification}
      />
      <div className="load-more-button-container">
        {twinList.totalPages !== twinList.currentPage &&
          <Button
            size="medium"
            sx={{mt: 15}}
            onClick={() => setPageNumber((prevState) => prevState + 1)}
          >
            {t('content.digitaltwin.table.load_button')}
          </Button>
        }
      </div>
    </section>
  )
}

export default TwinTable