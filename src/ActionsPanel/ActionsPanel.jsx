import { useEffect, useRef, useState } from 'react'
import { Panel } from 'primereact/panel';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { GET_DIMENSIONS, selectedDimensionVar, SET_TODO } from "../apollo/index.js";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ToggleButton } from "primereact/togglebutton";
import { InputSwitch } from "primereact/inputswitch";

export default function ActionsPanel () {
  const toastRef = useRef(null); // Toast reference

  const [completed, setCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, error, data } = useQuery(GET_DIMENSIONS);
  const selectedDimension = useReactiveVar(selectedDimensionVar);

  const [todoTitle, setTodoTitle] = useState(''); // State to hold input value
  const [createTodo, mutation] = useMutation(SET_TODO);

  useEffect(() => {
    if (data?.first?.results[0] && !selectedDimension) {
      selectedDimensionVar(data?.first?.results[0].dimension);
    }
  }, [data, selectedDimension]);

  if (loading) return <ProgressSpinner style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }}/>;

  const dimensions = [...(new Set([...data.first.results, ...data.second.results, ...data.third.results].map(item => item.dimension)))]

  const handleSelect = (e) => selectedDimensionVar(e.value);


  const handleMutation = async () => {
    try {
      // Perform mutation
      const result = await createTodo({ variables: { title: todoTitle, completed } });
      console.log('Mutation Result:', result.data.createTodo);
      toastRef.current.show({
        severity: result.data.createTodo.completed ? 'success' : 'info',
        summary: 'Item Created',
        detail: `Item ID: ${result.data.createTodo.id}, title: ${result.data.createTodo.title} -- ${result.data.createTodo.completed ? 'COMPLETED!' : 'OPEN'}`,
        life: 3000
      });
      setModalVisible(false);
    } catch (err) {
      toastRef.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 3000
      });
      console.error('Mutation Error:', err);
    }


  };

  return (
    <Panel header="Actions" className="mb-4 flex-content">
      <Toast ref={toastRef}/>

      <Dropdown
        value={selectedDimension}
        options={dimensions}
        onChange={handleSelect}
        placeholder="Select a Location"
      />


      <Button
        label="Mutation Modal"
        className="ml-2"
        severity="warning"
        icon="pi pi-external-link"
        style={{ background: '#3b82f6' }}
        onClick={() => setModalVisible(true)}
      />

      <Dialog
        header="Run Mutation"
        visible={modalVisible}
        style={{ width: '50vw' }}
        onHide={() => setModalVisible(false)} // Close modal on hide
      >

        <div className="mb-5">
          <span className="p-float-label mb-2">
            <InputText id="todo-title" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
            <label htmlFor="todo-title">Enter Title</label>
          </span>

          <InputSwitch
            checked={completed}
            onChange={(e) => setCompleted(e.value)}
          />

        </div>

        <Button
          icon="pi pi-check"
          className="p-button-text"
          label={mutation.loading ? 'Creating...' : 'Create Todo'}
          onClick={handleMutation}
          disabled={mutation.loading || !todoTitle}
        />
        <Button
          label="Close"
          icon="pi pi-times"
          className="p-button-text p-button-danger ml-3"
          onClick={() => setModalVisible(false)}
        />
      </Dialog>
    </Panel>

  )
}
