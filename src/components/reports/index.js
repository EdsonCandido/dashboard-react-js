import "devextreme/dist/css/dx.light.css";
import {
  Column,
  DataGrid,
  Editing,
  FilterRow,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";

import { Button, Form, Popup } from "devextreme-react";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import api from "../../services/api";
import { useEffect, useState } from "react";

const Reports = ({
  size = 5,
  edit = false,
  destroy = false,
  source = [],
  endpoint = "",
}) => {
  const [dataSource, setDataSource] = useState(source);

  useEffect(() => {
    setDataSource(source);
  }, [source]);

  const removeData = async (key) => {
    console.log("Remove key: ", key);
    const respo = await api.delete(`${endpoint}/${key}`);

    if (respo.status != 200) {
      alert("Algo de inesperado aconteceu");
      // window.location.reload();
    } else {
      setDataSource(dataSource.filter((element) => element.id !== key));
    }
  };

  const soc = async () => {
    console.log("envio");
  };

  const updateData = async (key, values) => {
    console.log("key: ", key, "Values: ", values);
    const respo = await api.put(`${endpoint}/${key}`, values);
    console.log(respo);
  };

  const custom_store = new CustomStore({
    key: "id",
    load: () => {
      return dataSource;
    },
    update: (key, values) => {
      //   updateData(key, values);
      //   data_source.reload();
      //   window.location.reload();
    },
    remove: (key) => {
      removeData(key);
      data_source.reload();
    },
    insert: async (values) => {
      console.log(values);
      const respo = await api.post(`${endpoint}`);
      console.log(respo);
      setDataSource([...dataSource, respo.data]);
      //   data_source.reload();
    },
  });

  const data_source = new DataSource({
    store: custom_store,
    onChanged: () => {
      console.log(data_source);
      //   data_source.reload();
    },
    onSubmit: () => {
      console.log(data_source);
      data_source.reload();
    },
  });
  const isActive = (data) => {
    let msg = data.text ? "Sim" : "Não";
    let color = data.text ? "success" : "danger";

    return (
      <Button
        width={"100%"}
        onClick={() => isDisable(data)}
        type={color}
        text={msg}
      ></Button>
    );
  };

  const isDisable = async (data) => {
    console.log(data);
    const respo = await api.delete(`${endpoint}/${data.key}`);
    setDataSource(dataSource.filter((element) => element.id !== data.key));
    // window.location.reload();
  };

  return (
    <DataGrid dataSource={data_source} keyExpr="id">
      <FilterRow visible={true} />
      <Editing
        allowUpdating={true}
        allowDeleting={destroy}
        allowAdding={edit}
        mode="form"
        useIcons={true}
        texts={{ confirmDeleteMessage: "Corpstek" }}
      >
        <Form labelLocation="top" />
        <Popup showTitle={true} title="Row in the editing state" />
      </Editing>
      <Column caption={"ID"} dataField="id" allowEditing={false}></Column>
      <Column caption={"NOME"} dataField="name"></Column>
      <Column caption={"SENHA"} dataField="password"></Column>
      <Column caption={"E-MAIL"} dataField="email"></Column>
      <Column caption={"CPF"} dataField="cpf"></Column>
      <Column
        alignment="center"
        caption={"LOGADO"}
        dataField="is_logged"
        cellRender={(data) => isActive(data)}
      ></Column>
      <SearchPanel placeholder="Pesquisar" visible={true} />
      <Paging defaultPageSize={size} defaultPageIndex={0} />
    </DataGrid>
  );
};

export default Reports;
