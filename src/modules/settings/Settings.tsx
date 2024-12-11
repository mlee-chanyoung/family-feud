import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Input, Select } from "../../components/input";
import { QuestionSetRetriever } from "../../util/questionSetRetreiver";
import "./settings.scss";
import { SettingValues } from "./type";

interface SettingsProps {
  initial?: SettingValues;
  onCancel: (event?: React.MouseEvent) => void;
  onSubmit: (values: SettingValues) => void;
}
export const Settings = ({ initial = {}, onCancel, onSubmit }: SettingsProps) => {
  const { formState: { errors }, register, handleSubmit } = useForm<SettingValues>({
    mode: "onChange",
    defaultValues: initial,
  });
  const onFormSubmit = (data: SettingValues) => {
    onSubmit(data);
  };
  const setOptions = useMemo(() => {
    return QuestionSetRetriever.getValidSets().map((option) => ({ label: option.title, value: option.id }));
  }, [])

  return (
    <div className="settings">
      <h1 className="margin-bottom-medium">Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          error={errors.targetScore?.message}
          fullWidth
          groupProps={{ className: "margin-bottom-medium" }}
          label="Target score"
          {...register("targetScore", {
            required: "Must have a target score",
            min: { value: 1, message: "Must be greater than zero." },
            pattern: { value: /^-?\d+(\.\d+)?$/, message: "Must be a number." }
          })}
        />
        <Select
          error={errors.questionSetId?.message}
          fullWidth
          label="Question set"
          placeholder="---"
          options={setOptions}
          {...register("questionSetId", {
            required: "Must select a question set",
          })}
        />
        <div className="settings-form-cta-group">
          <div>
            <Button buttonSize="medium" type="submit">Start game</Button>
          </div>
          <div>
            <Button onClick={onCancel} type="reset">Cancel</Button>
          </div>
        </div>
      </form>
    </div>
  );
}