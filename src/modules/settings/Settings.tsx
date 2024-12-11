import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
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

  return (
    <div className="settings">
      <h1 className="margin-bottom-medium">Settings</h1>
      <form className="settings-form" onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          error={errors.targetScore?.message}
          fullWidth
          label="Target score"
          {...register("targetScore", {
            required: "Must have a target score",
            min: { value: 1, message: "Must be greater than zero." },
            pattern: { value: /^-?\d+(\.\d+)?$/, message: "Must be a number." }
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